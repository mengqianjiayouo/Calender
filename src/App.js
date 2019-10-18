import React from 'react';
import './App.css';
import moment from 'moment'
import Table from '@roo/roo/Table';
import DatePicker from '@roo/roo/DatePicker';
import '@roo/roo/theme/default/index.css';
moment.locale('zh-cn');

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      daysArr: [],
      dataList: [],
      date: new Date()
    }
  }
  componentDidMount() {
    this.monthDay(new Date())
  }
  monthDay() {
    const { dataList, date } = this.state;
    const daysArr = [{}, {}, {}, {}, {}, {}]; // 6*7的日历数组
    const currentWeekday = moment(date).date(1).weekday(); // 获取当月1日为星期几
    // console.log('1号为星期几', currentWeekday)
    const lastMonthDays = moment(date).subtract(1, 'month').daysInMonth(); // 获取上月天数
    // console.log('上个月天数', lastMonthDays)
    const currentMonthDays = moment(date).daysInMonth(); // 获取当月天数
    // console.log('本月天数', currentMonthDays)
    // console.log(moment(date).startOf('month'))
    const getDay = day => {
      let m, d, isable, data;
      if (day <= lastMonthDays) {
        m = moment(date).subtract(1, 'months').startOf('month').add(day - 1, 'days').format('YYYY-MM-DD');
        // console.log(m)
        d = day
        isable = false
      } else if (day <= (lastMonthDays + currentMonthDays)) {
        let currentDay = day - lastMonthDays
        m = moment(date).startOf('month').add(currentDay - 1, 'days').format('YYYY-MM-DD');
        // console.log(m)
        d = day - lastMonthDays;
        isable = true
      } else {
        let nextDays = day - (lastMonthDays + currentMonthDays)
        m = moment(date).add(1, 'months').startOf('month').add(nextDays - 1, 'days').format('YYYY-MM-DD');
        // console.log(m)
        d = day - (lastMonthDays + currentMonthDays);
        isable = false
      }

      dataList.map((item, index) => {
        if (item.dateStr == m) {
          data = { ...item }
        }
      })
      return {
        dateStr: m,
        day: d,
        canClick: isable,
        data: { ...data }
      }
    }


    // day <= lastMonthDays 说明是是在上个月
    //day <= lastMonthDays+currentMonthDays 说明是在本月底之前否则就是在下个月
    for (let i = 0; i < 7; i += 1) {
      let virtualDay = (lastMonthDays - currentWeekday) + i + 2;
      //30 - 2 +1 = 29
      //30 -2 +2 =30
      //31
      //32 
      //33
      //34
      //35
      for (let j = 0; j < 6; j += 1) {
        let dateInfo = getDay(virtualDay + (j * 7))
        daysArr[j][i] = { ...dateInfo };
        daysArr[j].id = j + '';
      }
    }
    console.log(daysArr)
    this.setState({
      daysArr
    })
    // moment().calendar(daysArr)
  }
  calenderItem(item) {
    return <div style={{ background: item.canClick ? '#fff' : '#f8f8f8', height: '60px' }}>
      <div className="date">{item.day || ''}</div>

    </div>
  }
  render() {
    let that = this;
    const columns = [

      {
        prop: 0, label: '星期一', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 1, label: '星期二', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 2, label: '星期三', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 3, label: '星期四', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 4, label: '星期五', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 5, label: '星期六', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
      {
        prop: 6, label: '星期日', render(text, record, index) {
          return that.calenderItem(text || {})
        }
      },
    ];
    return (
      <div className="App">
        <div style={{ width: '200px', padding: '20px 0' }} id="scroll-wrap">
          <DatePicker
            format="YYYY-MM"
            defaultValue={moment(this.state.date).format('YYYY-MM')}
            valueOfType="string"
            type="month"
            clearable
            placeholder="请选择月份"
            onChange={date => {
              console.log('month：', date)
              this.setState({
                date: date
              }, () => {
                this.monthDay()
              })
            }}
            popupContainer={() => document.querySelector('#scroll-wrap')}
          />

        </div>

        <Table
          border
          rowKey="id"
          columns={columns}
          data={this.state.daysArr}
        />
      </div>
    );
  }
}

export default App;
