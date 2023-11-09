# lt-dropdown-menu-jquery-to-react

Get a conversion from jQuery DropDown Menu to React (JSX) ! 
https://github.com/jquery/jquery-ui/blob/master/ui/widgets/selectmenu.js
## Installation
nodejs is required min v17 into your computer and you will use React min V.17 with this component !
```js
# using npm
npm install lt-dropdown-menu-jquery-to-react

# using yarn
yarn add lt-dropdown-menu-jquery-to-react
```

## Usage into React

```js
# using import
import { DropDownSelect } from 'lt-dropdown-menu-jquery-to-react';
```

## Example

### Using promises:

```jsx
<DropDownSelect
    className={"form-group"}
    id={"state"}
    title={"State"}
    dataArray={dataStates}
    keyToWatch={"name"}
    keyToValue={"abbreviation"}
    keyToValueDefaultValue={"AL"}
/>
```
Require differents Props : 
- className : Apply class Css for component
- id : id to search into DOM result of the select tag.
- title : text of the label tag
- dataArray : array of objects (ex : [{"name" : "x", "value": "y"},{"name" : "a", "value": "b"} ]), 
- keyToWatch : key of object to assign into text of the option tag into select tag.
- keyToValue : key of object to assign into value the option tag into select tag. 
- keyToValueDefaultValue : select default value of the option selected tag into select tag on launch of composant