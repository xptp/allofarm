import ResearchBase, { content as base } from './ResearchBase';
import Allomedin, { content as allomedin } from './Allomedin';
import Entomix, { content as entomix } from './Entomix';
import Allostatin, { content as allostatins } from './Allostatin';
import Flip7, { content as flip7 } from './Flip7';
import InovaC, { content as inova } from './InovaC';
import Calliphoridae, { content as cultivation } from './Calliphoridae';

export const developmentPages = {
  base: { Component: ResearchBase, content: base },
  allomedin: { Component: Allomedin, content: allomedin },
  entomix: { Component: Entomix, content: entomix },
  allostatins: { Component: Allostatin, content: allostatins },
  flip7: { Component: Flip7, content: flip7 },
  'inova-c': { Component: InovaC, content: inova },
  calliphoridae: { Component: Calliphoridae, content: cultivation },
};
