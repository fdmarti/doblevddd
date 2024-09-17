import { useProductosStore } from '@productos/store/productosStore';

export const useGCODEFile = async (event: Event) => {
  const productoStore = useProductosStore();

  const target = event.target as HTMLInputElement;
  if (!target.files) {
    return false;
  }

  const valueForPieza = {} as any;

  const file = target.files[0];

  valueForPieza.descripcion = file.name.split('.')[0];

  const fileContent = await file.text();
  const splitedText = fileContent.trim().split(';');

  for (let i = 2; i < 4; i++) {
    const splitSubValue = splitedText[i].split(':');

    valueForPieza[splitSubValue[0].toLocaleLowerCase().replace(' ', '_')] = Number(
      splitSubValue[1].replace('m', ''),
    );
  }

  const result = await productoStore.postPiezaDetail(valueForPieza);

  if (!result) return false;

  return result;
};
