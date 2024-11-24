import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
  interviewSettings: IInterViewSettings;
  onUpdateInterviewSettings: (field: keyof IInterViewSettings, value: any) => void;
}> = ({ handleTab, interviewSettings, onUpdateInterviewSettings }) => {
  const {
    errors,
    touched,
    handleSubmit,
    values,
    setFieldValue,
    setFieldTouched,
  } = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: interviewSettings.interviewMode || "",
      interviewDuration: interviewSettings.interviewDuration || "",
      interviewLanguage: interviewSettings.interviewLanguage || "",
    },
    validationSchema: Yup.object().shape({
      interviewMode: Yup.string().required("Interview mode is required"),
      interviewDuration: Yup.string().required("Interview duration is required"),
      interviewLanguage: Yup.string().required("Interview language is required"),
    }),
    onSubmit: (values) => {
      alert("Form successfully submitted");
    },
  });

  const handleFieldChange = (field: keyof IInterViewSettings, value: any) => {
    setFieldValue(field, value);
    onUpdateInterviewSettings(field, value);
  };

  return (
    <Box width="100%" as="form" onSubmit={handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(field: any, value: any) => handleFieldChange("interviewMode", value)}
          onBlur={setFieldTouched}
          value={values?.interviewMode}
          error={errors?.interviewMode}
          touched={touched?.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(field: any, value: any) =>
            handleFieldChange("interviewDuration", value)
          }
          onBlur={setFieldTouched}
          value={values?.interviewDuration}
          error={errors?.interviewDuration}
          touched={touched?.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          placeholder="Select interview language"
          name="interviewLanguage"
          options={interviewLanguageOptions}
          onChange={(field: any, value: any) =>
            handleFieldChange("interviewLanguage", value)
          }
          onBlur={setFieldTouched}
          value={values?.interviewLanguage}
          error={errors?.interviewLanguage}
          touched={touched?.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit" isDisabled={!values.interviewMode || !values.interviewDuration || !values.interviewLanguage}>
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
