import React, { useState, forwardRef, ReactNode, CSSProperties, ReactElement } from 'react';
import styles from './SearchTermsDropdown.module.css'
import Dropdown from 'react-bootstrap/Dropdown'
import { FormControl, OverlayTrigger } from 'react-bootstrap';
import Popover from 'react-bootstrap/Popover'

interface CustomToggleProps {
  children?: ReactNode
  onClick: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
}

const CustomToggle = forwardRef<HTMLAnchorElement, CustomToggleProps>(({ children, onClick }, ref) => {
  return (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  );
});

CustomToggle.displayName = "CustomToggle";

interface CustomMenuProps {
  children: ReactElement[]
  style?: CSSProperties
  className?: string
  'aria-labelledby'?: string

}

const CustomMenu = forwardRef<HTMLDivElement, CustomMenuProps>(({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {

  const [value, setValue] = useState('');

  return (
    <div
      ref={ref}
      style={style}
      className={className}
      aria-labelledby={labeledBy}
    >
      <FormControl
        autoFocus
        className="mx-3 my-2 w-auto"
        placeholder="Type to filter..."
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <ul className="list-unstyled">
        {React.Children.toArray(children).filter(
          (child: ReactElement) =>
            !value || child.props?.term?.toLowerCase()?.startsWith(value),
        )}
      </ul>
    </div>
  );
});

CustomMenu.displayName = "CustomMenu";



interface TermDropdownItemProps {
  term: string
  description: string
  syntax: string
  example: string
  onClick: (term: string) => void
}

const TermDropdownItem = ({ term, description, syntax, example, onClick }: TermDropdownItemProps) => {

  const popover = (
    <Popover>
      <Popover.Header as="h3">{term}</Popover.Header>
      <Popover.Body>
        {description}
        <br /><br />
        Syntax:<br />
        <code>{syntax}</code>
        <br /><br />
        Example:<br />
        <code>{example}</code>
      </Popover.Body>
    </Popover>

  )

  return (
    <OverlayTrigger placement="right" overlay={popover}>
      <Dropdown.Item onClick={(e) => onClick(`${term}:\"\"`)}>{term}</Dropdown.Item>
    </OverlayTrigger>
  )
}


interface SearchTermsDropdownProps {
  onClick: (term: string) => void
}

const SearchTermsDropdown = ({ onClick }: SearchTermsDropdownProps) => {


  return (
    <Dropdown className='d-inline-flex'>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        All search terms
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropdownMenu} as={CustomMenu}>
        <Dropdown.Header>fields</Dropdown.Header>
        <TermDropdownItem term={"bibcode"} description={"Find a specific record using the ADS bibcode (ADS identifier of a paper)."} syntax={"bibcode:adsbib"} example={"bibcode:bibcode:1988apj...333l..69m"} onClick={onClick} />
        <TermDropdownItem term={"bibstem"} description={"Find papers published in a particular publication."} syntax={"bibstem:abbrev"} example={"bibstem:ApJ"} onClick={onClick} />
        <TermDropdownItem term={"full"} description={"Search for records containing the given text."} syntax={"full:phrase"} example={"full:\"Infrared\""} onClick={onClick} />
        <TermDropdownItem term={"page"} description={"Search for papers with a given page number in an article."} syntax={"page:number"} example={"page:32"} onClick={onClick} />
        <TermDropdownItem term={"page_sequence"} description={"Search for papers with a given page number in a collection (e.g. journal)."} syntax={"page_sequence:number"} example={"page_sequence:32"} onClick={onClick} />
        <TermDropdownItem term={"pagecolor"} description={"Search for pages with a given color. Available colors are BW, Greyscale and Color."} syntax={"pagecolor:color"} example={"pagecolor:Greyscale"} onClick={onClick} />
        <TermDropdownItem term={"pagetype"} description={"Find a specific type of record. Available options are Normal, Frontmatter, Backmatter, Insert and Plate."} syntax={"pagetype:type"} example={"pagetype:Plate"} onClick={onClick} />
        <TermDropdownItem term={"project"} description={"Find records belonging to a given project."} syntax={"project:name"} example={"project:PHaEDRA"} onClick={onClick} />
        <TermDropdownItem term={"volume"} description={"Search for papers with a given volume."} syntax={"volume:volume"} example={"volume:10"} onClick={onClick} />
      </Dropdown.Menu>
    </Dropdown>
  )
}

export default SearchTermsDropdown;