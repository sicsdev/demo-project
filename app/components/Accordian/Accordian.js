import React from 'react'
import './Accordian.css'
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';
import List from '../Layout/components/List';
const Accordian = () => {
    return (
        <div className='nav-accordian'>
            <Accordion allowZeroExpanded>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <h3 className='text-heading text-lg font-semibold'> Products</h3>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                            <List className={'grid grid-cols-1 gap-8'} />
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <h3 className='text-heading text-lg font-semibold'> Solutions</h3>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                            <List className={'grid grid-cols-1 gap-8'} />
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <h3 className='text-heading text-lg font-semibold'>  Pricing</h3>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                            <List className={'grid grid-cols-1 gap-8'} />
                    </AccordionItemPanel>
                </AccordionItem>

            </Accordion>
        </div>
    )
}

export default Accordian