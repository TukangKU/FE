/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { Pagination } from "@/utils/types/api";
import { generatePagesToDisplay } from "@/utils/types/formatter";
import { useMemo } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  meta?: Pagination;
  onClickPrevious: () => void;
  onClickNext: () => void;
  onClickPage: (page: string | number) => void;
}

const PaginationButton = (props: Props) => {
  const { meta, onClickNext, onClickPage, onClickPrevious } = props;

  const pagesToDisplay = useMemo(
    () => generatePagesToDisplay(meta?.page!, meta?.total_pages!),
    [meta]
  );

  return (
    <div className="flex justify-center items-center gap-3">
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === 1}
        onClick={onClickPrevious}>
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {meta &&
        pagesToDisplay.map((Page, index) => {
          return (
            <Button
              variant="outline"
              size="icon"
              key={`${Page}-${index}`}
              disabled={meta?.page === Page}
              onClick={() => onClickPage(Page)}>
              {Page}
            </Button>
          );
        })}
      <Button
        variant="outline"
        size="icon"
        disabled={meta?.page === meta?.total_pages}
        onClick={onClickNext}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationButton;
