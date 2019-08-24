import {
  types,
  IModelType,
  ModelProperties,
  IArrayType,
  ModelCreationType2,
  ModelSnapshotType2
} from 'mobx-state-tree';
import { mst } from 'classy-mst';

export type RecursiveType<PROPS> = PROPS & {
  similar?: RecursiveType<PROPS>[];
};

export function mstWithReferenceChildren<
  PROPS extends ModelProperties,
  OTHERS,
  CustomC,
  CustomS,
  TYPE
>(
  Code: new () => TYPE,
  Data: IModelType<PROPS, OTHERS, CustomC, CustomS>,
  name?: string
) {
  const Children = types.array(
    types.safeReference(types.late((): any => Model))
  );
  const Branch = ((Data as any) as IModelType<
    PROPS,
    TYPE,
    CustomC,
    CustomS
  >).props({
    similar: (Children as any) as IArrayType<
      IModelType<
        RecursiveType<PROPS>,
        OTHERS,
        RecursiveType<ModelCreationType2<PROPS, CustomC>>,
        RecursiveType<ModelSnapshotType2<PROPS, CustomS>>
      >
    >
  });

  const Model = mst(Code, Branch, name) as typeof Branch;

  return { Model, Children };
}
