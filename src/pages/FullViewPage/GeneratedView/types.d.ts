declare module 'json-custom-view' {
  export const generate: (
    json: string | object,
    mainNode: HTMLElement,
    settings: object
  ) => void;
}
