import { useId } from "react";
import { startNewNote } from "../../../src/store/journal/thunks";

describe("Pruebas en thunks journal", () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("startNewNote debe de crear una nueva nota en blanco", async () => {
    const uid = "TEST-UID";
    getState.mockReturnValue({ auth: { uid: uid } });

    await startNewNote()(dispatch, getState);
  });
});
