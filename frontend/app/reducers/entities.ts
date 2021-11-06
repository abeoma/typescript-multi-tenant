import actionCreatorFactory from "typescript-fsa";
import { reducerWithoutInitialState } from "typescript-fsa-reducers";
import { mergeWith } from "lodash-es";

const actionCreator = actionCreatorFactory("ENTITIES_REDUCER");

type EntitiesState = {
  [k: string]: {
    [k: string]: Record<string, unknown>;
  };
};

export const onNormalized =
  actionCreator<{ entities: EntitiesState }>("ON_NORMALIZED");

export const entities = reducerWithoutInitialState<EntitiesState>().case(
  onNormalized,
  (state, payload) =>
    mergeWith({}, state, payload.entities, (object, sources) => {
      if (Array.isArray(object) && Array.isArray(sources) && object.length > 0)
        return sources;
    })
);
