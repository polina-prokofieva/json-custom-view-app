import { RefObject, useEffect } from "react";
import { useJsonStore } from "../../../../store/useJsonStore";
import { generate, GenerateResultType } from "json-custom-view";

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
    const renderInfo: GenerateResultType = generate(json, mainNode, settings);
  }, [json, mainRef, settings]);
};

export default useGenerateJson;
