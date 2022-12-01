import classes from './AppGrid.module.css';
import { Link } from 'react-router-dom';
import { App } from '../../../interfaces/App';

import { AppCard } from '../AppCard/AppCard';
import { Message } from '../../UI';

interface Props {
  apps: App[];
  totalApps?: number;
  searching: boolean;
}

export const AppGrid = (props: Props): JSX.Element => {
  let apps: JSX.Element;

  if (props.searching || props.apps.length) {
    if (!props.apps.length) {
      apps = <Message>No apps match your search criteria</Message>;
    } else {
      let cats = new Set<string>();
      let catsArray: Array<string> = [];
      let appsList: Array<JSX.Element> = [];

      props.apps.forEach((app: App) => {
        cats.add(app.description);
      });
      cats.forEach((item: string) => {
        catsArray.push(item);
      });
      catsArray
       .sort((a: string, b: string) : number => { return b.localeCompare(a); })
       .forEach((item: string) => {
        appsList.push(
          <div className={classes.AppGrid}>
            {props.apps.filter((app: App) => { return app.description.indexOf(item) >= 0; }).map((app: App): JSX.Element => {
              return <AppCard key={app.id} app={app} />;
            })}
          </div>
        );
      });
      apps = (
        <div>
          {appsList}
        </div>
      );
    }
  } else {
    if (props.totalApps) {
      apps = (
        <Message>
          There are no pinned applications. You can pin them from the{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    } else {
      apps = (
        <Message>
          You don't have any applications. You can add a new one from{' '}
          <Link to="/applications">/applications</Link> menu
        </Message>
      );
    }
  }

  return apps;
};
