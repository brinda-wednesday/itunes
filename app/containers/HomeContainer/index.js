import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { injectSaga } from 'redux-injectors';
import { selectHomeContainer, selectReposData, selectReposError, selectRepoName } from './selectors';
import { homeContainerCreators } from './reducer';
import homeContainerSaga from './saga';
import If from '@app/components/If/index';
import CustomCard from '@app/components/CustomCard/index';
const { Search } = Input;

const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: ${(props) => props.maxwidth}px;
    width: 100%;
    margin: 0 auto;
    padding: ${(props) => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchGithubRepos,
  dispatchClearGithubRepos,
  intl,
  reposData = {},
  reposError = null,
  repoName,
  maxwidth,
  padding
}) {
  const [loading, setLoading] = React.useState(false);
  useEffect(() => {
    const loaded = get(reposData, 'items', null) || reposError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [reposData]);
  useEffect(() => {
    if (repoName && !reposData?.items?.length) {
      dispatchGithubRepos(repoName);
      setLoading(true);
    }
  }, []);

  const history = useHistory();

  const handleOnChange = (rName) => {
    if (!isEmpty(rName)) {
      dispatchGithubRepos(rName);
      setLoading(true);
    } else {
      dispatchClearGithubRepos();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const items = get(reposData, 'items', []);
  const totalCount = get(reposData, 'totalCount', 0);

  const renderErrorState = () => {
    let repoError;
    if (reposError) {
      repoError = reposError;
    } else if (!get(reposData, 'totalCount', 0)) {
      repoError = 'respo_search_default';
    }
    return (
      !loading &&
      repoError && (
        <Card color={reposError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={repoError} />
        </Card>
      )
    );
  };

  const refreshPage = () => {
    history.push('/stories');
    window.location.reload();
  };

  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <Card title={intl.formatMessage({ id: 'repo_search' })} maxwidth={maxwidth}>
        <T marginBottom={10} id="get_repo_details" />
        <Search
          data-testid="search-bar"
          defaultValue={repoName}
          type="text"
          onChange={(evt) => debouncedHandleOnChange(evt.target.value)}
        />
      </Card>

      <If condition={items.length !== 0 || loading}>
        <Card>
          <Skeleton loading={loading} active>
            {repoName && (
              <div>
                <T id="search_query" values={{ repoName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_repos" values={{ totalCount }} />
              </div>
            )}
            {items.map((item, index) => (
              <CustomCard
                data-testid="custom-card"
                key={index}
                name={item.name}
                fullName={item.fullName}
                stargazersCount={item.stargazersCount}
              ></CustomCard>
            ))}
          </Skeleton>
        </Card>
      </If>
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchGithubRepos: PropTypes.func,
  dispatchClearGithubRepos: PropTypes.func,
  intl: PropTypes.object,
  reposData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  reposError: PropTypes.object,
  repoName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 500,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  reposData: selectReposData(),
  reposError: selectReposError(),
  repoName: selectRepoName()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetGithubRepos, clearGithubRepos } = homeContainerCreators;
  return {
    dispatchGithubRepos: (repoName) => dispatch(requestGetGithubRepos(repoName)),
    dispatchClearGithubRepos: () => dispatch(clearGithubRepos())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  injectIntl,
  withConnect,
  memo,
  injectSaga({ key: 'homeContainer', saga: homeContainerSaga })
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
