import dva from 'dva';
import './less/index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
