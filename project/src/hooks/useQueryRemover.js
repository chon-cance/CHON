import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function useQueryRemover({ query, excuteFunc }) {
  const [searchParam, setSearchParam] = useSearchParams();

  useEffect(() => {
    if (searchParam.has(query)) {
      searchParam.delete(query);
      setSearchParam(searchParam);
      if (excuteFunc) {
        excuteFunc();
      }
    }
  }, []);
}
