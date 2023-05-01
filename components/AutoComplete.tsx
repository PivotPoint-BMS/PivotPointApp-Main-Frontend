import React, { InputHTMLAttributes, useMemo, useState } from 'react'
import clsx from 'clsx'
import useTranslate from 'hooks/useTranslate'

interface AutoCompleteProps<T> extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  label?: string
  startAdornment?: React.ReactNode
  endAdornment?: React.ReactNode
  error?: {
    message: string
    type: string
  }
  options: T[]
  valueExtractor: (data: T) => string
  displayOption: (data: T, index: number) => React.ReactNode
}

export default function AutoComplete<T>({
  label,
  name,
  startAdornment,
  endAdornment,
  error,
  options,
  valueExtractor,
  displayOption,

  ...other
}: AutoCompleteProps<T>) {
  const { t } = useTranslate()
  const [activeOption, setActiveOption] = useState<number>(-1)
  const [showOptions, setShowOptions] = useState(false)
  const [userInput, setUserInput] = useState('')
  const [focused, setFocused] = useState(false)

  const filteredOptions = useMemo(
    () =>
      userInput.length === 0
        ? options
        : options.filter((option) => {
            if (typeof option === 'string')
              return option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
            return valueExtractor(option).toLowerCase().indexOf(userInput.toLowerCase()) > -1
          }),
    [userInput]
  )

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.currentTarget.value
    setShowOptions(true)
    setUserInput(input)
  }

  const onClick = (value: string, index: number) => {
    setActiveOption(index)
    setShowOptions(false)
    setUserInput(value)
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // User pressed the enter key
    if (e.key === 'Enter') {
      if (filteredOptions.length > 0) {
        e.preventDefault()
        setUserInput(valueExtractor(filteredOptions[activeOption]))
        setShowOptions(false)
        setFocused(false)
      }
    }
    // User pressed the up arrow
    else if (e.key === 'ArrowUp') {
      if (activeOption === 0) {
        return
      }
      setShowOptions(true)
      setActiveOption((prevState) => prevState - 1)
    }
    // User pressed the down arrow
    else if (e.key === 'ArrowDown') {
      if (activeOption + 1 < filteredOptions.length) {
        setShowOptions(true)
        setActiveOption((prevState) => prevState + 1)
      }
    }
  }

  return (
    <div className='group flex w-full flex-col gap-1'>
      <label
        htmlFor={name}
        className={clsx('text-sm font-medium dark:text-white', error && 'text-red-500')}
      >
        {label}
      </label>
      <div
        className={clsx(
          'flex w-full items-center justify-center rounded-lg bg-transparent',
          'outline outline-1 outline-gray-400 focus-within:outline-2 focus-within:outline-primary-600 hover:outline-primary-600',
          'dark:outline-gray-300 dark:focus-within:outline-primary-300 dark:hover:outline-primary-300',
          error &&
            '!outline-red-500 focus-within:outline-red-500 hover:outline-red-500 dark:outline-red-500'
        )}
      >
        {startAdornment && <span className='mx-2'>{startAdornment}</span>}
        <div className='relative h-fit w-full'>
          <input
            {...other}
            id={name}
            name={name}
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className='w-full flex-1 rounded-lg bg-transparent p-2 outline-none'
          />
          {showOptions && userInput && focused && (
            <div className='absolute bottom-0 left-0 h-fit w-full translate-y-full  overflow-hidden rounded-lg border bg-paper-light py-2 shadow-lg dark:bg-paper-dark'>
              <ul>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((item, index) => (
                    <li
                      className='relative cursor-pointer p-1'
                      onClick={() => onClick(valueExtractor(item), index)}
                      key={`autocomplete-option-${index}`}
                    >
                      <span
                        className={clsx(
                          'absolute top-0 left-0 h-full w-full hover:bg-gray-500/20 active:bg-gray-500/20',
                          activeOption === index && 'bg-gray-500/20'
                        )}
                      ></span>
                      {displayOption(item, index)}
                    </li>
                  ))
                ) : (
                  <p className='p-2'>{t('No Option')}</p>
                )}
              </ul>
            </div>
          )}
        </div>
        {endAdornment && <span className='mx-2'>{endAdornment}</span>}
      </div>
      {error?.message && <span className='text-xs text-red-500'>{error?.message}</span>}
    </div>
  )
}
