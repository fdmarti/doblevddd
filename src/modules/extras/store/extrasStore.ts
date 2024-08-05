import { computed, reactive, ref } from 'vue';
import { defineStore } from 'pinia';

import { GetExtras, SaveExtra, DeleteExtra } from '@extras/actions';

import type { Extra } from '@extras/interface/extras.response';

export const useExtrasStore = defineStore('extra', () => {
  const extras = ref<Extra[]>();
  const extrasFilter = ref<string>('');
  const extrasPagination = reactive({
    currentPage: 1,
    amountExtras: 10,
    totalPages: 0,
  });

  const isLoading = ref(true);

  const getExtras = async () => {
    try {
      const result = await GetExtras();
      extras.value = result;
      isLoading.value = false;
    } catch (error) {
      resetExtras();
    }
  };

  const saveExtra = async (extra: Extra): Promise<boolean> => {
    try {
      const result = await SaveExtra(extra);
      if (!result.status) return false;
      if (!extras.value) return false;

      if (!extra.id) {
        extras.value!.push({
          id: result.idextra,
          descripcion: extra.descripcion.toUpperCase(),
          precio: extra.precio,
        });

        return true;
      }

      for (let i = 0; i < extras.value.length; i++) {
        if (extras.value[i].id === result.idextra) {
          extras.value[i].descripcion = extra.descripcion;
          extras.value[i].precio = extra.precio;

          break;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  };

  const deleteExtra = async (extraId: number): Promise<boolean> => {
    try {
      const result = await DeleteExtra(extraId);

      extras.value = extras.value!.filter((extra) => extra.id !== extraId);

      return result.status;
    } catch (error) {
      return false;
    }
  };

  const nextPageExtras = () => {
    if (extrasPagination.currentPage + 1 > extrasPagination.totalPages) return;
    extrasPagination.currentPage++;
  };

  const prevPageExtras = () => {
    if (extrasPagination.currentPage - 1 === 0) return;
    extrasPagination.currentPage--;
  };

  const checkAmountPages = (extrasArray: Extra[]) => {
    extrasPagination.totalPages = Math.ceil(extrasArray.length / extrasPagination.amountExtras);
  };

  const resetExtras = () => {
    extras.value = [];
    isLoading.value = false;
    return false;
  };

  return {
    currentPage: computed(() => extrasPagination.currentPage),
    totalPages: computed(() => extrasPagination.totalPages),
    extrasAll: computed(() => extras.value),
    extras: computed(() => {
      const extrasName = extrasFilter.value.toLowerCase();
      const filteredExtras = extras.value!.filter((extra) => {
        if (extra.descripcion.toLowerCase().includes(extrasName)) {
          return extra;
        }
      });

      checkAmountPages(filteredExtras);

      return filteredExtras.slice(
        (extrasPagination.currentPage - 1) * extrasPagination.amountExtras,
        extrasPagination.amountExtras * extrasPagination.currentPage,
      );
    }),
    extrasFilter,
    isLoading,

    getExtras,
    saveExtra,
    deleteExtra,
    nextPageExtras,
    prevPageExtras,
    checkAmountPages,
  };
});
