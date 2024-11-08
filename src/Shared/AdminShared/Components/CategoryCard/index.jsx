import React, { memo } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";

const CategoryCard = (props) => {
  const { category, onEditClick } = props;

  return (
    <>
      <Card className={`p-0 CategoryCard h-100 border-0`}>
        <CardHeader
          className={`p-0 onlyBorderRadius d-flex align-items-center justify-content-between border-0 h-100`}
        >
          <div
            className={`p-3 h-100 onlyBorderRadius CategoryCardHeader`}
            style={{ minWidth: "280px", maxWidth: "280px" }}
          >
            <Link
              className="w-100 h-100"
              to={`/admin/settings/category/${category.uuid}/${category.id}/subCategory`}
            >
              <h6 className="mb-0 h-100 text-start fw-bold textGrey">
                {category.title} / {category.title_ar}
              </h6>
            </Link>
          </div>

          <div className="w-25">
            <div className="rounded-circle text-black-custom">
              <FaEdit
                className="cursorPointer mb-1"
                onClick={() =>
                  onEditClick({
                    id: category.id,
                    title: category.title,
                    title_ar: category.title_ar,
                  })
                }
              />
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
};

export default memo(CategoryCard);
