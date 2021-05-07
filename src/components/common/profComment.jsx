import React, { Component } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { FilterTwoTone } from '@ant-design/icons';
import axios from 'axios';



const data = [
    {
      key: 1,
      name: 'John Brown',
      course: 'Maths',
      rate: 32,
      time: 'New York No. 1 Lake Park',
      description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
    },
    {
      key: 2,
      name: 'Jim Green',
      course: 'Maths',
      rate: 42,
      time: 'London No. 1 Lake Park',
      description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
    },
    {
      key: 3,
      name: 'John',
      course: 'Maths',
      rate: 29,
      time: 'Jiangsu No. 1 Lake Park',
      description: 'I hate him.',
    },
    {
      key: 4,
      name: 'Joe Black',
      course: 'Maths',
      rate: 32,
      time: 'Sidney No. 1 Lake Park',
      description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
    },
    {
        key: 5,
        name: 'Joe Black',
        course: 'Maths',
        rate: 32,
        time: 'Sidney No. 1 Lake Park',
        description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
      },
  ];



  class profTable extends Component {
    state = {
      searchText: '',
      searchedColumn: '',
    };

    componentDidMount() {
        // const {data : comments} = async () => await axios.get('xxxx'); 
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
              title: 'User Name',
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
            }} dataSource={data} />;
      }
    }
  
    export default profTable;