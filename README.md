# React Pagination

## Installation

```
$ yarn add react-pitu
```

```javascript

import React, { Component } from 'react'
import Pagination from 'react-pitu';

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
