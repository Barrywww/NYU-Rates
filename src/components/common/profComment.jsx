import React, { Component } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { FilterTwoTone } from '@ant-design/icons';
import http from "../../services/httpService";



  class ProfTable extends Component {
    state = {
      searchText: '',
      searchedColumn: '',
      data: []
    };

    componentDidMount() {
        http.get("professor/stats_course").then(response => {
          if (response.data.code === 200){
            let d = [];
            for (let c of response.data.comments){
              d.push({
                key: c.comment_id,
                name: c.student_id,
                course: c.course_name,
                rate: c.rate,
                time: c.date.split("T")[0],
                description: c.content
              })
            }
            this.setState({data: d});
          }
        })
    }
  
    getColumnSearchProps = dataIndex => ({    //这一整个就是个filter而已，插入到column里去的
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => {
              this.searchInput = node;
            }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<FilterTwoTone />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: filtered => <FilterTwoTone style={{ color: filtered ? '#1890ff' : undefined }} />,
      onFilter: (value, record) =>
        record[dataIndex]
          ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
          : '',
      onFilterDropdownVisibleChange: visible => {
        if (visible) {
          setTimeout(() => this.searchInput.select(), 100);
        }
      },
      render: text =>
        this.state.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[this.state.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    handleSearch = (selectedKeys, confirm, dataIndex) => { 
      confirm();
      this.setState({
        searchText: selectedKeys[0],
        searchedColumn: dataIndex,
      });
    };
  
    handleReset = clearFilters => {
      clearFilters();
      this.setState({ searchText: '' });
    };
    render() {
        const columns = [
            {
              title: 'User',
              dataIndex: 'name',
              key:'name',
            },
            {
              title: 'Course Name',
              dataIndex: 'course',
              key:'course',
              ...this.getColumnSearchProps('course'),
            },
            {
              title: 'Rate',
              dataIndex: 'rate',
              key:'rate',
              ...this.getColumnSearchProps('rate'),
            },
            {
                title: 'Comment Time',
                dataIndex: 'time',
                key:'time',
                ...this.getColumnSearchProps('time'),
            },
        ];
        return <Table columns={columns} expandable={{
            expandedRowRender: record => <p style={{ margin: 0,fontSize:'1rem' }}>{record.description}</p>,
            rowExpandable: record => record.name !== 'Not Expandable',
            }} dataSource={this.state.data} />;
      }
    }
  
    export default ProfTable;