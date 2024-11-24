import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  jobDetails: IJobDetails;
  onUpdateJobDetails: (field: keyof IJobDetails, value: any) => void;
}> = ({ handleTab, jobDetails, onUpdateJobDetails }) => {
  const {
    handleChange,
    errors,
    touched,
    handleBlur,
    handleSubmit,
    values,
    setFieldValue,
  } = useFormik<IJobDetails>({
    initialValues: {
      jobTitle: jobDetails.jobTitle || "",
      jobDetails: jobDetails.jobDetails || "",
      jobLocation: jobDetails.jobLocation || "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details are required"),
      jobLocation: Yup.string().required("Job Location is required"),
    }),
    onSubmit: (values) => {
      handleTab(2);
    },
  });

  const handleFieldChange = (field: keyof IJobDetails, value: any) => {
    setFieldValue(field, value);
    onUpdateJobDetails(field, value);
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={(e) => handleFieldChange("jobTitle", e.target.value)}
          onBlur={handleBlur}
          value={values?.jobTitle}
          error={errors?.jobTitle}
          touched={touched?.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={(e) => handleFieldChange("jobDetails", e.target.value)}
          onBlur={handleBlur}
          value={values?.jobDetails}
          error={errors?.jobDetails}
          touched={touched?.jobDetails}
        />
        <FormInput
          label="Job Location"
          placeholder="Enter job location"
          name="jobLocation"
          onChange={(e) => handleFieldChange("jobLocation", e.target.value)}
          onBlur={handleBlur}
          value={values?.jobLocation}
          error={errors?.jobLocation}
          touched={touched?.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
