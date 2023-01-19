import { Fragment, useState } from "react";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { campaignActions } from "../../store/campaign-slice";
import classes from "./CampaignFilter.module.css";

const CampaignFilter = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyword, setKeyword] = useState(null);

  const dispatch = useDispatch();

  const startDateHandler = (event) => {
    setStartDate(event.target.value);
    dispatch(
      campaignActions.filterCampaigns({
        startDate: event.target.value,
        endDate: endDate,
        keyword: keyword,
      })
    );
  };

  const endDateHandler = (event) => {
    setEndDate(event.target.value);
    dispatch(
      campaignActions.filterCampaigns({
        startDate: startDate,
        endDate: event.target.value,
        keyword: keyword,
      })
    );
  };

  const keywordChangeHandler = (event) => {
    setKeyword(event.target.value);
    dispatch(
      campaignActions.filterCampaigns({
        startDate: startDate,
        endDate: endDate,
        keyword: event.target.value,
      })
    );
  };

  return (
    <Fragment>
      <Row className={`${classes.customRow} ${classes.mt20}`}>
        <Col md={12}>
          <Row>
            <Col md={3}>
              <Form.Group>
                <Form.Control
                  required
                  type="date"
                  placeholder="Start Date"
                  onChange={startDateHandler}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group>
                <Form.Control
                  required
                  min={startDate}
                  type="date"
                  placeholder="End Date"
                  onChange={endDateHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  placeholder="Search by name"
                  onChange={keywordChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CampaignFilter;
