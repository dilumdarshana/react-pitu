# React Pagination

[![NPM](https://nodei.co/npm/react-pitu.png?downloads=true)](https://nodei.co/npm/react-pitu/)

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
        if (prevProps.totalCount !== this.props.totalCount) {
            this.setState({ totalItemCount: selectGetAllItemsTotal });
        }
    }

    handlePaginationChange(data) {
        const { cursor, itemsPerPage } = data;

        // make a next http request...
    }

    render() {
        const { perPage, totalItemCount } = this.state;

        return(
            <Pagination
                perPage={perPage}
                total={totalItemCount}
                onPropertyChange={this.handlePaginationChange}
            />
        );
    }
}

export default UserComponent;

```

## Preview
![Example](https://i.gyazo.com/9a265a39f32b3ea88647c7addde47912.png)

## Props

Name | Type | Default | Description
--- | --- | --- | --- |
`perPage` | Number | 5 | Items per page needs to show
`total` | Number | | **Required** Total items count
`perPageOptions` | Array | [5, 10, 15] | Per page options
`navImages` | Object | | **Optional**
`onPropertyChange` | Function | | **Required.** Pagination change handler.Will emit cursor and itemsPerPage

### navImages

Name | Type | Default | Description
--- | --- | --- | --- |
`rightNavImg` | String | pagination-right.png | Path to right arrow navigation icon
`leftNavImg` | String | pagination-left.png | Path to left arrow navigation icon
`leftMostNavImg` | String | pagination-left-most.png | Path to left most arrow navigation icon
`rightMostNavImg` | String | pagination-right-most.png | Path to right most arrow navigation icon