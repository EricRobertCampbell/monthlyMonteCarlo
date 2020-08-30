import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionIcon,
  AccordionPanel,
  Heading,
} from "@chakra-ui/core";

import ResultsTable from "./ResultsTable";

const ResultsAccordion = (props) => {
  return (
    <Accordion allowToggle defaultIndex={[]}>
      <AccordionItem>
        <AccordionHeader>
          Results Table
          <AccordionIcon />
        </AccordionHeader>
        <AccordionPanel>
          <ResultsTable data={props.data} />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default ResultsAccordion;
