import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommonProps } from "@/@types/common";
import type { Dispatch, MouseEvent, SetStateAction } from 'react'
import Card from "../Card";
import classNames from "classnames";

interface AccordionProps extends CommonProps {
    isOpen: boolean,
}

const Accordion = ({ isOpen, children }: AccordionProps) => {
    // By using `AnimatePresence` to mount and unmount the contents, we can animate
    // them in and out while also only rendering the contents of open accordions
    return (
        <>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                        <motion.div className="pb-4">
                            {children}
                        </motion.div>

                    </motion.section>
                )}
            </AnimatePresence>
        </>
    );
};

export default Accordion

// export const Example = () => {

//   const [expanded, setExpanded] = useState<false | number>(0);

//   return accordionIds.map((i) => (
//     <Accordion i={i} expanded={expanded} setExpanded={setExpanded} />
//   ));
// };

// const accordionIds = [0, 1, 2, 3];
