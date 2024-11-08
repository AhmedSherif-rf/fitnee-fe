import React, { memo } from "react";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "reactstrap";

const SubCategoryCard = (props) => {
  const { subCategory, onEditClick } = props;

  return (
    <>
      <Card className={`border-0 p-0 CategoryCard h-100`}>
        <CardHeader
          className={`p-0 onlyBorderRadius h-100 d-flex align-items-center justify-content-between border-0`}
        >
          <div
            className={`h-100 p-3 onlyBorderRadius CategoryCardHeader`}
            style={{ minWidth: "85%", maxWidth: "85%" }}
          >
            <Link
              className="h-100"
              to={`/admin/exercises/addExercises/${subCategory.id}`}
            >
              <h6 className="mb-0 text-start fw-bold textGrey">
                {subCategory.title} / {subCategory.title_ar}
              </h6>
            </Link>
          </div>

          <div className="w-25">
            <div className="rounded-circle text-black-custom">
              <FaEdit
                className="cursorPointer mb-1"
                onClick={() =>
                  onEditClick({
                    id: subCategory.id,
                    title: subCategory.title,
                    title_ar: subCategory.title_ar,
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

export default memo(SubCategoryCard);
