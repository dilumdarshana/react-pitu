# React Pagination

## Installation

```
$ yarn add react-pitu
```

```javascript

import React, { Component } from 'react'
import Pagination from 'react-pitu';
import 'react-pitu/build/assets/styles/styles.css';

class UserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            perPage: 10,
            totalItemCount: 0
        };

        this.handlePaginationChange = this.handlePaginationChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        
    }

    handlePaginationChange(data) {
        const { cursor, itemsPerPage } = data;

        // make a next http request...
    }

    render() {
        const { perPage, totalItemCount } = this.state;

        return(
            <Pagination perPage={perPage} total={totalItemCount} onPropertyChange={this.handlePaginationChange} />
        );
    }
}

export default UserComponent;

```
## Props

Name | Type | Default | Description
--- | --- | --- | --- |
`perPage` | Number | 5 | Items per page needs to show
`total` | Number | | **Required** Total items count
`options` | Object | | **Optional**
`onPropertyChange` | Function | | **Required.** Pagination change handler. Will emit cursor and itemsPerPage

### options
Name | Type | Default | Description
--- | --- | --- | --- |
`perPageOptions` | Array | [5, 10, 15] | Per page options
`rightNavImg` | String | pagination-right.png | Right arrow navigation icon
`leftNavImg` | String | pagination-left.png | Left arrow navigation icon