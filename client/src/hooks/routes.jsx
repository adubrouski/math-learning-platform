import { Route, Switch, Redirect } from 'react-router-dom';
import { Home, Topics, Classrooms, Exams, Classroom, Topic } from '../pages';

const useRoutes = (authorization) => {
  if (authorization) {
    return (
      <Switch>
        <Route path="/home" exact component={Home} />
        <Route path="/topics" exact component={Topics} />
        <Route path="/topics/topic/:id" exact component={Topic} />
        <Route path="/classrooms/classroom" exact component={Classroom} />
        <Route path="/classrooms" exact component={Classrooms} />
        <Route path="/exams" exact component={Exams} />
        <Route path="/exams/exam/:id" exact component={Exams} />
        <Redirect to="/home" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/home" exact component={Home} />
      <Route path="/login" exact component={Home} />
      <Route path="/register" exact component={Home} />
      <Redirect to="/home" />
    </Switch>
  );
};

export { useRoutes };
