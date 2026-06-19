import {Autocomplete, useFilter} from 'react-aria-components/Autocomplete';
import {Select, SelectValue} from 'react-aria-components/Select';
import {Header, ListBoxSection} from './ListBox.tsx'
import {Button} from './Button';
import {SelectListBox, SelectItem} from './Select';
import {Popover} from './Popover';
import {SearchField} from './SearchField';
import {ChevronDown} from './icons.tsx';

import './CurrencySelector.css';
import type { RefObject } from 'react';

const baseUrl = import.meta.env.BASE_URL;

export default function CurrencySelector({triggerRef}: {triggerRef: RefObject<Element | null>}) {
  let {contains} = useFilter({sensitivity: 'base'});

  return (
    <Select aria-label='Select currency' value="usd">
      <Button>
        <SelectValue className="select-value"/>
        <ChevronDown />
      </Button>
      <Popover hideArrow triggerRef={triggerRef}>
        <Autocomplete filter={contains} >
          <SearchField aria-label="Search currencies" placeholder="Search currencies..." autoFocus />
          <SelectListBox>
            <ListBoxSection>
              <Header className='currency-section-header'>
                <span className='header-name'>Popular</span>
                <span className='header-count'>3</span>
              </Header>
              <SelectItem id='usd' textValue='USD: US Dollar'>
                <img src={`${baseUrl}/flags/us.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">USD</span>
                <span className="currency-name">US Dollar</span>
              </SelectItem>
              <SelectItem id='eur' textValue='EUR: Euro'>
                <img src={`${baseUrl}/flags/eu.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">EUR</span>
                <span className="currency-name">Euro</span>
              </SelectItem>
              <SelectItem id='gbp' textValue='GBP: British pound'>
                <img src={`${baseUrl}/flags/gb.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">GBP</span>
                <span className="currency-name">British pound</span>
              </SelectItem>
            </ListBoxSection>

            <ListBoxSection>
              <Header className='currency-section-header'>
                <span className='header-name'>Other Currencies</span>
                <span className='header-count'>52</span>
              </Header>
              <SelectItem id='aed' textValue='AED: UAE dirham'>
                <img src={`${baseUrl}/flags/ae.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">AED</span>
                <span className="currency-name">UAE dirham</span>
              </SelectItem>
              <SelectItem id='ars' textValue='ARS: Argentine Peso'>
                <img src={`${baseUrl}/flags/ar.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">ARS</span>
                <span className="currency-name">Argentine Peso</span>
              </SelectItem>
              <SelectItem id='aud' textValue='AUD: Australian Dollar'>
                <img src={`${baseUrl}/flags/au.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">AUD</span>
                <span className="currency-name">Australian Dollar</span>
              </SelectItem>
              <SelectItem id='bdt' textValue='BDT: Bangladeshi Taka'>
                <img src={`${baseUrl}/flags/bd.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">BDT</span>
                <span className="currency-name">Bangladeshi Taka</span>
              </SelectItem>
              <SelectItem id='bgn' textValue='BGN: Bulgarian Lev'>
                <img src={`${baseUrl}/flags/bg.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">BGN</span>
                <span className="currency-name">Bulgarian Lev</span>
              </SelectItem>
              <SelectItem id='bhd' textValue='BHD: Bahraini Dinar'>
                <img src={`${baseUrl}/flags/bh.webp`} alt="" width="20" height="20" className='currency-icon' />
                <span className="currency-symbol">BHD</span>
                <span className="currency-name">Bahraini Dinar</span>
              </SelectItem>
            </ListBoxSection>
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}
