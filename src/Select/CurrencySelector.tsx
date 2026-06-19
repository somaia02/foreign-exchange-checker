import {Autocomplete, useFilter} from 'react-aria-components/Autocomplete';
import {Select, SelectValue} from 'react-aria-components/Select';
import {type SelectProps} from 'react-aria-components';
import {Header, ListBoxSection} from './ListBox.tsx'
import {Button} from './Button';
import {SelectListBox, SelectItem} from './Select';
import {Popover} from './Popover';
import {SearchField} from './SearchField';
import {ChevronDown} from './icons.tsx';

import './CurrencySelector.css';
import { useState, type RefObject } from 'react';
import { useCurrencies } from '../api/useCurrencies.tsx';
import { flagNames } from '../utils.tsx';

const baseUrl = import.meta.env.BASE_URL;
const POPULAR = ['USD', 'EUR', 'GBP'];
type ValueType = SelectProps<any>['value'];

export default function CurrencySelector({triggerRef}: {triggerRef: RefObject<Element | null>}) {
  let {contains} = useFilter({sensitivity: 'base'});
  const [selectedCurrency, setSelectedCurrency] = useState<ValueType>("usd");
  const codeString = selectedCurrency?.toString() || "";
  const data = useCurrencies();

  if (data.loading) return <p>Loading ... </p>;
  if (data.error !== "") return <p>{data.error}</p>;
  const currencies = data.data;
  const popularItems = [];
  const otherItems = [];
  for (let i = 0; i < currencies!.length; i++) {
    const code = currencies![i].iso_code;
    const item = <CurrencyOption key={code} code={code} name={currencies![i].name} />;
    if (POPULAR.includes(code)) {
      popularItems.push(item);
    } else {
      otherItems.push(item);
    }
  }

  return (
    <Select aria-label='Select currency' value={selectedCurrency} onChange={(val: ValueType) => setSelectedCurrency(val)}>
      <Button>
        <SelectValue className="select-value">
          <FlagIcon code={codeString} />
          <span className="currency-symbol">{codeString}</span>
        </SelectValue>
        <ChevronDown />
      </Button>
      <Popover hideArrow triggerRef={triggerRef}>
        <Autocomplete filter={contains} >
          <SearchField aria-label="Search currencies" placeholder="Search currencies..." autoFocus />
          <SelectListBox>
            <ListBoxSection>
              <Header className='currency-section-header'>
                <span className='header-name'>Popular</span>
                <span className='header-count'>{popularItems.length}</span>
              </Header>
              {popularItems}
            </ListBoxSection>

            <ListBoxSection>
              <Header className='currency-section-header'>
                <span className='header-name'>Other Currencies</span>
                <span className='header-count'>{otherItems.length}</span>
              </Header>
              {otherItems}
            </ListBoxSection>
          </SelectListBox>
        </Autocomplete>
      </Popover>
    </Select>
  );
}

function CurrencyOption({ code, name }: { code: string, name: string}) {
  const textValue = `${code}: ${name}`;

  return (
    <SelectItem id={code.toLocaleLowerCase()} textValue={textValue}>
      <FlagIcon code={code} />
      <span className="currency-symbol">{code}</span>
      <span className="currency-name">{name}</span>
    </SelectItem>
  );
}

function FlagIcon({ code }: {code: string}) {
  const icon = flagNames.includes(code.toLowerCase().slice(0, 2)) ?
  <img src={`${baseUrl}/flags/${code.toLowerCase().slice(0, 2)}.webp`} alt="" width="20" height="20" className='currency-icon' /> :
  <span className="currency-icon globe-icon">&#127760;</span>;
  return icon;
}
