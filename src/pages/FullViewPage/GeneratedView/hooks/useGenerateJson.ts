import { RefObject, useEffect } from "react";
import { useJsonStore } from "../../../../store/useJsonStore";
import { generate, GenerateResultType } from "json-custom-view";
import { useRenderStore } from "../../../../store/useRenderStore";

type Params = {
  json: string;
  mainRef: RefObject<HTMLDivElement | null>;
};

const useGenerateJson = ({ json, mainRef }: Params): void => {
  const settings = useJsonStore((state) => state.settings);
  const update = useRenderStore((state) => state.update);

  useEffect(() => {
    const mainNode = mainRef.current;
    if (!mainNode) return;

    mainNode.innerHTML = '';
    const renderInfo: GenerateResultType = generate(json, mainNode, settings);
    update(renderInfo);
  }, [json, mainRef, settings]);
};

export default useGenerateJson;
