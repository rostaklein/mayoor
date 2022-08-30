import React, { useState } from "react";
import { useTranslation } from "next-i18next";
import { Table, Row, Col, Empty } from "antd";
import { ColumnProps } from "antd/lib/table";
import { PaginationConfig } from "antd/lib/pagination";

import { StyledTableWrapper, StyledSearch } from "../SharedStyles/Table.styles";

type Props<RecordType> = {
  records: RecordType[];
  totalCount: number;
  columns: ColumnProps<RecordType>[];
  loading: boolean;
  onPaginationChange: (newPageNumber: number) => void;
  onSearch?: (searchValue: string) => void;
  translations: {
    search: string;
    emptyResult: string;
  };
  topRowContent?: React.ReactNode;
  pageSize: number;
};

interface Record {
  id: string;
}

export function PaginatedTable<T extends Record>(props: Props<T>) {
  const { t } = useTranslation();
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const pagination: PaginationConfig = {
    current: currentPageNumber,
    total: props.totalCount,
    pageSize: props.pageSize,
    hideOnSinglePage: true,
    showTotal: (total, range) =>
      t("Showing {{start}}-{{end}} of {{total}} items", {
        total,
        start: range[0],
        end: range[1],
      }),
    onChange: (newPageNumber) => {
      setCurrentPageNumber(newPageNumber);
      props.onPaginationChange(newPageNumber);
    },
  };

  const selectHandler = (id: string, isSelected: boolean) => {
    if (isSelected) {
      return setSelectedItems([...selectedItems, id]);
    }
    setSelectedItems(selectedItems.filter((currentId) => currentId !== id));
  };

  const searchSubmitHandler = (searchValue: string) => {
    setCurrentPageNumber(1);
    props.onSearch && props.onSearch(searchValue);
  };

  return (
    <StyledTableWrapper>
      <Row justify="end">
        {props.topRowContent}
        {props.onSearch && (
          <Col xs={24} md={6}>
            <StyledSearch
              enterButton
              placeholder={props.translations.search}
              onSearch={searchSubmitHandler}
            />
          </Col>
        )}
      </Row>

      <Table<T>
        columns={props.columns}
        dataSource={props.records}
        pagination={pagination}
        loading={props.loading}
        rowKey={(record) => record.id}
        size="middle"
        rowSelection={{
          onSelect: ({ id }, isSelected) => selectHandler(id, isSelected),
          selectedRowKeys: selectedItems,
          onSelectAll: (_, selectedRows) => {
            setSelectedItems(selectedRows.map(({ id }) => id));
          },
        }}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={props.translations.emptyResult}
            />
          ),
        }}
      />
    </StyledTableWrapper>
  );
}
