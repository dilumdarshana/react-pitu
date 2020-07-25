import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './assets/styles/styles.scss';
import left from './assets/images/pagination-left.png';
import right from './assets/images/pagination-right.png';
import rightMost from './assets/images/pagination-right-most.png';
import leftMost from './assets/images/pagination-left-most.png';

class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paginationOutData: {
                itemsPerPage: 0,
                cursor: 1
            },
            displaySize: 5, // how many page buttons show
            displayStartsAt: 1, // page buttons start number
            pageButtonsStack: [], // page buttons to show on current go
            previousButtonClass: 'btn-disabled',
            nextButtonClass: '',
            firstButtonClass: 'btn-disabled',
            lastButtonClass: '',
        };

        this.handleLastPage = this.handleLastPage.bind(this);
        this.handleFirstPage = this.handleFirstPage.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
    }

    async componentDidMount() {
        const { perPage } = this.props;

        await this.setState({
            paginationOutData: {
                itemsPerPage: perPage,
                cursor: 1
            }
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
                    cursor: 1
                },
                displayStartsAt: 1
            });

            this.setNextPrevButtonStatus();

            this.createPageButtonStack();
        }
    }

    /**
     * Decide total number of pages need to display
     */
    getTotalNumberOfButtons() {
        const {
            paginationOutData: { itemsPerPage }
        } = this.state;
        const { total } = this.props;

        return Math.ceil(total / itemsPerPage);
    }

    /**
     * Next/Previous buttons enable/disable
     */
    async setNextPrevButtonStatus() {
        const {
            paginationOutData: { cursor }
        } = this.state;
        const maxNumberOfButtons = this.getTotalNumberOfButtons();

        let nextButtonClass = '';
        let previousButtonClass = '';
        let firstButtonClass = '';
        let lastButtonClass = '';

        if (cursor === 1) {
            previousButtonClass = 'btn-disabled';
            firstButtonClass = 'btn-disabled';
        }

        if (cursor === maxNumberOfButtons) {
            nextButtonClass = 'btn-disabled';
            lastButtonClass = 'btn-disabled';
        }
        // const nextButtonClass =
        //     cursor === maxNumberOfButtons ? 'btn-disabled' : '';
        // const previousButtonClass = cursor === 1 ? 'btn-disabled' : '';

        this.setState({ previousButtonClass, nextButtonClass, firstButtonClass, lastButtonClass });
    }

    decideWalkingDirection() {
        const {
            paginationOutData: { cursor },
            pageButtonsStack
        } = this.state;
        const middle =
            pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];
        let direction = '';

        if (middle > cursor) {
            direction = 'left';
        }
        if (middle < cursor) {
            direction = 'right';
        }

        return direction;
    }

    async createPageButtonStack() {
        const { displayStartsAt, displaySize } = this.state;
        const itemsArr = [];
        const maxNumberOfButtons = this.getTotalNumberOfButtons();
        const displayEnd =
            maxNumberOfButtons <= displaySize
                ? maxNumberOfButtons
                : displaySize;
        for (
            let i = displayStartsAt;
            i < displayStartsAt + displayEnd;
            i += 1
        ) {
            itemsArr.push(i);
        }

        await this.setState({ pageButtonsStack: itemsArr });
    }

    async walkToRight() {
        const {
            displayStartsAt,
            displaySize,
            pageButtonsStack,
            paginationOutData: { cursor }
        } = this.state;

        // check how many buttons can be go
        const maxNumberOfButtons = this.getTotalNumberOfButtons();
        const cursorGap =
            cursor -
            pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1];

        if (displayStartsAt + displaySize <= maxNumberOfButtons) {
            const maxGapEnd =
                maxNumberOfButtons - displaySize - displayStartsAt + 1;
            const maxGap =
                displayStartsAt + cursorGap + displaySize >= maxNumberOfButtons
                    ? maxGapEnd
                    : cursorGap;

            await this.setState({ displayStartsAt: displayStartsAt + maxGap });

            this.createPageButtonStack();
        }
    }

    async walkToLeft() {
        const {
            displayStartsAt,
            paginationOutData: { cursor },
            pageButtonsStack
        } = this.state;
        const cursorGap = Math.abs(
            pageButtonsStack[Math.ceil(pageButtonsStack.length / 2) - 1] -
            cursor
        );

        // check how many buttons can be go
        if (displayStartsAt > 1) {
            const newStartAt =
                displayStartsAt - cursorGap === 0
                    ? 1
                    : displayStartsAt - cursorGap;
            await this.setState({ displayStartsAt: newStartAt });

            this.createPageButtonStack();
        }
    }

    async walkToEnd() {
        const {
            displaySize,
        } = this.state;
        const maxNumberOfButtons = this.getTotalNumberOfButtons();

        this.setNextPrevButtonStatus();

        await this.setState({ displayStartsAt: maxNumberOfButtons - displaySize + 1 });

        this.createPageButtonStack();
    }

    async walkToFirst() {
        await this.setState({ displayStartsAt: 1 });

        this.createPageButtonStack();
    }

    async handlePrevious() {
        const {
            paginationOutData: { cursor, itemsPerPage }
        } = this.state;
        const { onPropertyChange } = this.props;

        const nextCursor = cursor > 1 ? cursor - 1 : cursor;

        await this.setState({
            paginationOutData: { cursor: nextCursor, itemsPerPage }
        });

        const direction = this.decideWalkingDirection();

        this.setNextPrevButtonStatus();

        if (direction === 'left') {
            this.walkToLeft();
        }

        onPropertyChange({ cursor: nextCursor, itemsPerPage });
    }

    async handleNext() {
        const {
            paginationOutData: { cursor, itemsPerPage }
        } = this.state;
        const { onPropertyChange } = this.props;

        const nextCursor =
            cursor < this.getTotalNumberOfButtons() ? cursor + 1 : cursor;

        await this.setState({
            paginationOutData: { cursor: nextCursor, itemsPerPage }
        });

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
            cursor: 1
        };

        await this.setState({ paginationOutData, displayStartsAt: 1 });

        this.setNextPrevButtonStatus();

        onPropertyChange(paginationOutData);

        this.createPageButtonStack();
    }

    async handleCurrentPage(page) {
        const {
            paginationOutData: { itemsPerPage }
        } = this.state;
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

    async handleLastPage() {
        const {
            paginationOutData: { itemsPerPage }
        } = this.state;
        const { onPropertyChange } = this.props;

        const nextCursor = this.getTotalNumberOfButtons();

        this.walkToEnd();

        await this.setState({
            paginationOutData: { cursor: nextCursor, itemsPerPage }
        });

        onPropertyChange({ cursor: nextCursor, itemsPerPage });
    }

    async handleFirstPage() {
        const {
            paginationOutData: { itemsPerPage }
        } = this.state;
        const { onPropertyChange } = this.props;

        this.walkToFirst();

        this.setNextPrevButtonStatus();

        await this.setState({
            paginationOutData: { cursor: 1, itemsPerPage }
        });

        onPropertyChange({ cursor: 1, itemsPerPage });
    }

    render() {
        const {
            paginationOutData: { cursor },
            pageButtonsStack,
            previousButtonClass,
            nextButtonClass,
            firstButtonClass,
            lastButtonClass,
        } = this.state;

        const {
            total,
            perPage,
            perPageOptions,
            navImages:
                { rightNavImg, leftNavImg, rightMostNavImg, leftMostNavImg  },
        } = this.props;

        const paginationPerPageList = perPageOptions;

        const defaultPerPage = 5;

        const perPageItemOptions = paginationPerPageList.map(option => (
            <option key={option}>{option}</option>
        ));

        const paginationButtons = pageButtonsStack.map(elm => (
            <button
                type="button"
                key={elm}
                className={`page number ${elm === cursor ? 'active' : ''}`}
                onClick={() => this.handleCurrentPage(elm)}
            >
                {elm}
            </button>
        ));

        return (
            total > 0 && (
                <div className="pagination-wrapper">
                    <span className="per-page">
                        Per Page
                        <select
                            className="form-control"
                            value={perPage || defaultPerPage}
                            onChange={e => this.handleItemsPerPage(e)}
                        >
                            {perPageItemOptions}
                        </select>
                    </span>
                    <div className="page-wrapper mobile-custom-margin">
                        <button
                            type="button"
                            className={`page first-page ${firstButtonClass}`}
                            onClick={this.handleFirstPage}
                        >
                            <img
                                src={leftMostNavImg}
                                alt="First Page"
                            />
                        </button>
                        <button
                            type="button"
                            className={`page prev-page ${previousButtonClass}`}
                            onClick={this.handlePrevious}
                        >
                            <img
                                src={leftNavImg}
                                alt="Previous Page"
                            />
                        </button>
                        {paginationButtons}
                        <button
                            type="button"
                            className={`page next-page ${nextButtonClass}`}
                            onClick={this.handleNext}
                        >
                            <img
                                src={rightNavImg}
                                alt="Next Page"
                            />
                        </button>
                        <button
                            type="button"
                            className={`page last-page ${lastButtonClass}`}
                            onClick={this.handleLastPage}
                        >
                            <img
                                src={rightMostNavImg}
                                alt="Last Page"
                            />
                        </button>
                    </div>
                </div>
            )
        );
    }
}

Pagination.propTypes = {
    navImages: PropTypes.shape({
        rightNavImg: PropTypes.string,
        leftNavImg: PropTypes.string,
        rightMostNavImg: PropTypes.string,
        leftMostNavImg: PropTypes.string,
    }),
    perPageOptions: PropTypes.array,
    total: PropTypes.number.isRequired,
    perPage: PropTypes.number,
    onPropertyChange: PropTypes.func,
};

Pagination.defaultProps = {
    navImages: {
        rightNavImg: right,
        leftNavImg: left,
        rightMostNavImg: rightMost,
        leftMostNavImg: leftMost,
    },
    perPageOptions: [5, 10, 15],
    onPropertyChange: null,
    perPage: 5
};

export default Pagination;
