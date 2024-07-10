import { ref } from 'vue';

export const useDark = () => {
  const themeChecker = ref(false);
  const currentTheme = ref('');
  const themeName = 'doblev-theme';

  const lightThemeName = 'emerald';
  const darkThemeName = 'night';

  const checkCurrentTheme = (): void => {
    if (
      localStorage[themeName] === darkThemeName ||
      (!(themeName in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      localStorage.setItem(themeName, darkThemeName);
      themeChecker.value = true;
      currentTheme.value = darkThemeName;
    } else {
      localStorage.setItem(themeName, lightThemeName);
      themeChecker.value = false;
      currentTheme.value = lightThemeName;
    }

    setTheme(currentTheme.value);
  };

  const changeTheme = (): void => {
    if (themeChecker.value) {
      localStorage.setItem(themeName, darkThemeName);
    } else {
      localStorage.setItem(themeName, lightThemeName);
    }

    checkCurrentTheme();
  };

  const setTheme = (themeStatus: string): void => {
    document.querySelector('html')?.setAttribute('data-theme', themeStatus);
  };

  return {
    themeChecker,
    changeTheme,
    checkCurrentTheme,
  };
};
