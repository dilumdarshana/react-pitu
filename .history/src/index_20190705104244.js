import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PAGINATION_PER_PAGE_OPTIONS, PAGINATION_PER_PAGE_LARGE_OPTIONS, DEFAULT_PER_PAGE_LONG } from '../constants';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paginationOutData: {
                itemsPerPage: 0,
                cursor: 1,
            },
            displaySize: 5, // how many page buttons show
            displayStartsAt: 1, // page buttons start number
            pageButtonsStack: [], // page buttons to show on current go
            previousButtonClass: 'lst-disabled',
            nextButtonClass: '',
        };
    }

    async componentDidMount() {
        const { perPage } = this.props;

        await this.setState({
            paginationOutData: {
                itemsPerPage: perPage,
                cursor: 1,
            },
        });

        this.setNextPrevButtonStatus();

        this.createPageButtonStack();
    }

    async componentDidUpdate(prevProps) {
        const { total: totalPrev } = prevProps;
        const { total, perPage } = this.props;

        if (total !== totalPrev) {
            await this.setState({
                paginationOutData: {
                    itemsPerPage: perPage,
                    cursor: 1,
                },
                displayStartsAt: 1,
            });

            this.setNextPrevButtonStatus();

            this.createPageButtonStack();
        }
    }

    getTotalNumberOfButtons() {
        const { paginationOutData: { itemsPerPage } } = this.state;
        const { total } = this.props;

        return Math.ceil(total / itemsPerPage);
    }

    async setNextPrevButtonStatus() {
        const { paginationOutData: { cursor } } = this.state;
        const maxNumberOfButtons = this.getTotalNumberOfButtons();
        const nextButtonClass = (cursor === maxNumberOfButtons) ? 'lst-disabled' : '';
        const previousButtonClass = (cursor === 1) ? 'lst-disabled' : '';

        await this.setState({ previousButtonClass, nextButtonClass });
    }

    decideWalkingDirection() {
        const { paginationOutData: { cursor }, pageButtonsStack } = this.state;
        const middle = pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];
        let direction = '';

        if (middle > cursor) { direction = 'left'; }
        if (middle < cursor) { direction = 'right'; }

        return direction;
    }

    async createPageButtonStack() {
        const { displayStartsAt, displaySize } = this.state;
        const itemsArr = [];
        const maxNumberOfButtons = this.getTotalNumberOfButtons();
        const displayEnd = maxNumberOfButtons <= displaySize ? maxNumberOfButtons : displaySize;
        for (let i = displayStartsAt; i < displayStartsAt + displayEnd; i += 1) {
            itemsArr.push(i);
        }

        await this.setState({ pageButtonsStack: itemsArr });
    }

    async walkToRight() {
        const { displayStartsAt, displaySize, pageButtonsStack, paginationOutData: { cursor } } = this.state;

        // check how many buttons can be go
        const maxNumberOfButtons = this.getTotalNumberOfButtons();
        const cursorGap = cursor - pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];

        if (displayStartsAt + displaySize <= maxNumberOfButtons) {
            const maxGapEnd = maxNumberOfButtons - displaySize - displayStartsAt + 1;
            const maxGap = (displayStartsAt + cursorGap + displaySize) >= maxNumberOfButtons ? maxGapEnd : cursorGap;

            await this.setState({ displayStartsAt: displayStartsAt + maxGap });

            this.createPageButtonStack();
        }
    }

    async walkToLeft() {
        const { displayStartsAt, paginationOutData: { cursor }, pageButtonsStack } = this.state;
        const cursorGap = Math.abs(pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1] - cursor);

        // check how many buttons can be go
        if (displayStartsAt > 1) {
            const newStartAt = displayStartsAt - cursorGap === 0 ? 1 : displayStartsAt - cursorGap;
            await this.setState({ displayStartsAt: newStartAt });

            this.createPageButtonStack();
        }
    }

    async handlePrevious() {
        const { paginationOutData: { cursor, itemsPerPage } } = this.state;
        const { onPropertyChange } = this.props;

        const nextCursor = cursor > 1 ? cursor - 1 : cursor;

        await this.setState({ paginationOutData: { cursor: nextCursor, itemsPerPage } });

        const direction = this.decideWalkingDirection();

        this.setNextPrevButtonStatus();

        if (direction === 'left') {
            this.walkToLeft();
        }

        onPropertyChange({ cursor: nextCursor, itemsPerPage });
    }

    async handleNext() {
        const { paginationOutData: { cursor, itemsPerPage } } = this.state;
        const { onPropertyChange } = this.props;

        const nextCursor = cursor < this.getTotalNumberOfButtons() ? cursor + 1 : cursor;

        await this.setState({ paginationOutData: { cursor: nextCursor, itemsPerPage } });

        const direction = this.decideWalkingDirection();

        this.setNextPrevButtonStatus();

        if (direction === 'right') {
            this.walkToRight();
        }

        onPropertyChange({ cursor: nextCursor, itemsPerPage });
    }

    async handleItemsPerPage(e) {
        const newItemsPerPage = e.target.value;
        const { onPropertyChange } = this.props;

        const paginationOutData = {
            itemsPerPage: newItemsPerPage,
            cursor: 1,
        };

        await this.setState({ paginationOutData, displayStartsAt: 1 });

        this.setNextPrevButtonStatus();

        onPropertyChange(paginationOutData);

        this.createPageButtonStack();
    }

    async handleCurrentPage(page) {
        const { paginationOutData: { itemsPerPage } } = this.state;
        const { onPropertyChange } = this.props;

        const paginationData = { cursor: page, itemsPerPage };

        await this.setState({ paginationOutData: paginationData });

        const direction = this.decideWalkingDirection();

        this.setNextPrevButtonStatus();

        if (direction === 'right') {
            this.walkToRight();
        }

        if (direction === 'left') {
            this.walkToLeft();
        }

        onPropertyChange(paginationData);
    }

    render() {
        const { paginationOutData: { cursor }, pageButtonsStack, previousButtonClass, nextButtonClass } = this.state;

        const { total, perPage, isPerPageLarge } = this.props;

        const paginationPerPageList = (isPerPageLarge) ? PAGINATION_PER_PAGE_LARGE_OPTIONS : PAGINATION_PER_PAGE_OPTIONS;

        const defaultPerPage = (isPerPageLarge) ? DEFAULT_PER_PAGE_LONG : 5;

        const perPageItemOptions = paginationPerPageList.map(option => <option key={option}>{option}</option>);

        const paginationButtons = pageButtonsStack.map(elm => (<button type="button" key={elm} className={`page number ${elm === cursor ? 'active' : ''}`} onClick={e => this.handleCurrentPage(elm)}>{elm}</button>));

        return (total > 0
            && (
                <div className="pagination-wrapper">
                    <span className="per-page">Per Page
                        <select className="form-control" value={perPage || defaultPerPage} onChange={e => this.handleItemsPerPage(e)}>
                            {perPageItemOptions}
                        </select>
                    </span>
                    <div className="page-wrapper mobile-custom-margin">
                        <button type="button" className={`page prev-page ${previousButtonClass}`} onClick={e => this.handlePrevious()}>
                            <img src="../assets/images/paginate-left.png" alt="" />
                        </button>
                        {paginationButtons}
                        <button type="button" className={`page next-page ${nextButtonClass}`} onClick={e => this.handleNext()}>
                            <img src="../assets/images/paginate-right.png" alt="" />
                        </button>
                    </div>
                </div>
            )
        );
    }
}

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number,
    onPropertyChange: PropTypes.func,
    isPerPageLarge: PropTypes.bool,
};

Pagination.defaultProps = {
    onPropertyChange: null,
    perPage: 5,
    isPerPageLarge: false,
};

export default Pagination;