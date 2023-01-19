import { Fragment, useEffect } from "react";
import { Badge, Col, Row, Spinner, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { fetchCampaigns } from "../../store/campaign-actions";
import classes from "./CampaignList.module.css";

import moment from "moment";

const CampaignList = () => {
  const dispatch = useDispatch();
  const campaigns = useSelector((state) => state.filteredCampaignsList);
  const loading = useSelector((state) => state.loading);
  const tableHeaders = [
    "Campaign Name",
    "User name",
    "Start Date",
    "End Date",
    "Status",
    "Budget",
  ];

  useEffect(() => {
    dispatch(fetchCampaigns());
  }, []);

  return (
    <Fragment>
      <Row className={`${classes.customRow} ${classes.mt20}`}>
        <Col md={12} data-testid="api-data-content">
          {loading && (
            <Spinner animation="border">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          )}
          {!loading && (
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((campaign) => (
                  <tr key={campaign.id}>
                    <td>{campaign.campaign_name}</td>
                    <td>
                      {campaign.username ? campaign.name : "Unknown User"}
                    </td>
                    <td>
                      {campaign.startDate
                        ? moment(campaign.startDate).format("DD/MM/YYYY")
                        : "-"}
                    </td>
                    <td>
                      {campaign.endDate
                        ? moment(campaign.endDate).format("DD/MM/YYYY")
                        : "-"}
                    </td>
                    <td>
                      {Date.now() >= Date.parse(campaign.startDate) &&
                      Date.now() <= Date.parse(campaign.endDate) ? (
                        <strong>
                          <Badge bg="success" className={classes["bg-success"]}>
                            Active
                          </Badge>
                        </strong>
                      ) : (
                        <strong>
                          {Date.now() < Date.parse(campaign.startDate) ? (
                            <Badge bg="info" className={classes["bg-info"]}>
                              Not Started
                            </Badge>
                          ) : (
                            <Badge bg="danger" className={classes["bg-danger"]}>
                              Inactive
                            </Badge>
                          )}
                        </strong>
                      )}
                    </td>
                    <td>
                      {Intl.NumberFormat("en", { notation: "compact" }).format(
                        campaign.budget
                      ) + " USD"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Fragment>
  );
};

export default CampaignList;
