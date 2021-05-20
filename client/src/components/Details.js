import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

import 'react-accessible-accordion/dist/fancy-example.css';

export default function Details() {
  return (
      <Accordion>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                      Who is Scriabin?
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                  <p>
                      Alexander Scriabin was a late 19th / early 20th century Russian composer. Scriabin was influenced by synesthesia, and associated colours with various harmonic tones. His <a href="https://en.wikipedia.org/wiki/Clavier_%C3%A0_lumi%C3%A8res">synesthetic color to tone mappings</a> are used in this project to an image to a song.
                  </p>
              </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem>
              <AccordionItemHeading>
                  <AccordionItemButton>
                      How does this work?
                  </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                  <p>
                     Drag an image file of a painting or landscape, and you will get back a song from Spotify! The song you receive is based on a color analysis of the image, and is generated based on Scriabin's synesthetic mappings.
                  </p>
              </AccordionItemPanel>
          </AccordionItem>
      </Accordion>
  );
}