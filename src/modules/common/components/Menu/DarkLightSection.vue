<template>
    <ul>
        <li>
            <label class="flex cursor-pointer gap-2">
                <SunIcon />
                <input type="checkbox" value="synthwave" class="toggle theme-controller" id="check-theme"
                    name="check-theme" v-model="themeChecker" @change="changeTheme" />
                <MoonIcon />
            </label>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { SunIcon, MoonIcon } from '../icons';

import { useDark } from '@common/composables/useDark';

const { changeTheme, themeChecker, checkCurrentTheme } = useDark()

onMounted(() => {
    checkCurrentTheme()
})
</script>

<style scoped></style>