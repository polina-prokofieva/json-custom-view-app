import { RefObject, useEffect } from "react";
import { useJsonStore } from "../../../../store/useJsonStore";
import { generate } from "json-custom-view";

type Params = {
  json: string;
  mainRef: RefObject<HTMLDivElement | null>;
};

const useGenerateJson = ({ json, mainRef }: Params): void => {
  const settings = useJsonStore((state) => state.settings);

  useEffect(() => {
    const mainNode = mainRef.current;
    if (!mainNode) return;

    mainNode.innerHTML = '';
    generate(json, mainNode, settings);
  }, [json, mainRef, settings]);
};

export default useGenerateJson;
