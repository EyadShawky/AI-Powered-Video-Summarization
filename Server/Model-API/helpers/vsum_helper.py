from ortools.algorithms.python import knapsack_solver
import numpy as np
import math


osolver = knapsack_solver.KnapsackSolver(
    knapsack_solver.SolverType.KNAPSACK_DYNAMIC_PROGRAMMING_SOLVER, 'test'
)

def knapsack_ortools(values, weights, items, capacity ):
    scale = 1000
    values = np.array(values)
    weights = np.array(weights)
    values = (values * scale).astype(np.int_)
    weights = (weights).astype(np.int_)
    capacity = capacity

    osolver.init(values.tolist(), [weights.tolist()], [capacity])
    osolver.solve()
    packed_items = [x for x in range(0, len(weights))
                    if osolver.best_solution_contains(x)]

    return packed_items

def generate_summary(ypred, cps, n_frames, nfps, positions, proportion=0.15):

    n_segs = cps.shape[0]
    frame_scores = np.zeros((n_frames), dtype=np.float32)
    if positions.dtype != int:
        positions = positions.astype(np.int32)
    if positions[-1] != n_frames:
        positions = np.concatenate([positions, [n_frames]])
    for i in range(len(positions) - 1):
        pos_left, pos_right = positions[i], positions[i+1]
        if i == len(ypred):
            frame_scores[pos_left:pos_right] = 0
        else:
            frame_scores[pos_left:pos_right] = ypred[i]

    seg_score = []
    for seg_idx in range(n_segs):
        start, end = int(cps[seg_idx,0]), int(cps[seg_idx,1]+1)
        scores = frame_scores[start:end]
        seg_score.append(float(scores.mean()))


    limits = int(math.floor(n_frames * proportion))
    packed = knapsack_ortools(seg_score, nfps, n_segs, limits)


    # Get key-shot based summary
    summary = np.zeros(n_frames, dtype=np.bool_)
    for seg_idx in packed:
        first, last = cps[seg_idx]
        summary[first:last + 1] = True

    return summary


def custom_cps(specified_number, offset):
    change_points = []
    nfps = []
    start = 0
    while start < specified_number:
        if(start + offset > specified_number):
            end = specified_number
        else:
            end = start + offset
        change_points.append([start, end])
        start = end + 1
    for segment in change_points:
        nfps.append(segment[1] - segment[0] + 1)
    return np.array(change_points,dtype=np.int32), np.array(nfps,dtype=np.int32)