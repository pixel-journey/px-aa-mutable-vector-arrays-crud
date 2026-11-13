/**
 * Composition: multi-step vector CRUD keeps sibling keys.
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { clear, eraseAt, len, MAX_VEC_LEN, push, type AttrMap } from "./vectors.ts";

describe("composition: sequential vector CRUD", () => {
  it("push then erase middle; sibling vector stays", () => {
    let map: AttrMap = {};
    map = push(map, "scores", "int64_vec", 1n);
    map = push(map, "scores", "int64_vec", 2n);
    map = push(map, "scores", "int64_vec", 3n);
    map = push(map, "tags", "string_vec", "oak");
    map = eraseAt(map, "scores", 1);
    assert.deepEqual(map.scores?.value, [1n, 3n]);
    assert.deepEqual(map.tags?.value, ["oak"]);
  });

  it("fills to cap then refuses the next push", () => {
    let map: AttrMap = {};
    for (let i = 0; i < MAX_VEC_LEN; i++) {
      map = push(map, "bag", "uint64_vec", BigInt(i));
    }
    assert.equal(len(map, "bag"), MAX_VEC_LEN);
    assert.throws(() => push(map, "bag", "uint64_vec", 99n), /vec full/);
    assert.equal(len(map, "bag"), MAX_VEC_LEN);
  });

  it("clear one key does not delete the sibling", () => {
    let map: AttrMap = {};
    map = push(map, "scores", "int64_vec", -2n);
    map = push(map, "tags", "string_vec", "pine");
    map = clear(map, "scores");
    assert.equal(len(map, "scores"), 0);
    assert.equal(map.scores?.kind, "int64_vec");
    assert.deepEqual(map.tags?.value, ["pine"]);
  });

  it("kind mismatch mid-path leaves prior vectors intact", () => {
    let map: AttrMap = {};
    map = push(map, "scores", "int64_vec", 7n);
    map = push(map, "tags", "string_vec", "oak");
    assert.throws(() => push(map, "scores", "string_vec", "nope"), /kind mismatch/);
    assert.deepEqual(map.scores?.value, [7n]);
    assert.deepEqual(map.tags?.value, ["oak"]);
    const next = push(map, "scores", "int64_vec", 8n);
    assert.deepEqual(next.scores?.value, [7n, 8n]);
  });
});
