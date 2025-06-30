import * as React from 'react';
import {
  Combobox,
  Option,
  Field,
} from '@fluentui/react-components';

const GeoAutocomplete = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<{ value: string; data: any }[]>(
    []
  );

  const fetchSuggestions = async (query: string) => {
    const params = new URLSearchParams({
      minScore: '50',
      maxResults: '5',
      echo: 'false',
      brief: 'true',
      autoComplete: 'true',
      addressString: query,
    });

    try {
      const res = await fetch(`https://geocoder.api.gov.bc.ca/addresses.json?${params.toString()}`);
      const data = await res.json();

      if (data.features && data.features.length > 0) {
        setOptions(
          data.features.map((item: any) => ({
            value: item.properties.fullAddress,
            data: item,
          }))
        );
      } else {
        setOptions([]);
      }
    } catch (err) {
      setOptions([]);
    }
  };

  React.useEffect(() => {
    if (inputValue.length >= 3) {
      fetchSuggestions(inputValue);
    } else {
      setOptions([]);
    }
  }, [inputValue]);

  const handleSelect = (_: any, data: any) => {
    const selected = options.find((o) => o.value === data.optionValue);
    if (selected) {
      console.log('Selected:', selected.data);
    }
  };

  return (
    <Field label="Street">
      <Combobox
        value={inputValue}
        onInput={(e) =>
          setInputValue((e.target as HTMLInputElement).value)
        }
        onOptionSelect={handleSelect}
      >
        {options.map((opt) => (
          <Option key={opt.value}>{opt.value}</Option>
        ))}
      </Combobox>
    </Field>
  );
};

export default GeoAutocomplete;
