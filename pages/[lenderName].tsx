import React, { useCallback, useEffect, useState } from 'react';

import {
  LenderFields,
  LenderGetResponse,
  LenderPostResponse,
  LenderGetResponseExtended,
} from 'lib/types';
import CssBaseline from '@material-ui/core/CssBaseline';

import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { CHECK_BOX } from '../constants/constants';
import BuildFormComponent from '../components/BuildForm';
import ToasterComponent from '../components/ToasterCompoment';
import { Container, Paper, Typography } from '@material-ui/core';

const LenderNamePage: NextPage = () => {
  const router = useRouter();
  const lenderSlug = router.query.lenderName?.toString();
  /* -------------------------------------------------------------------------- */
  /*                                   Local state                              */
  /* -------------------------------------------------------------------------- */
  const [data, setData] = useState<
    LenderGetResponse | LenderGetResponseExtended
  >();
  const [lenderName, setLenderName] = useState<string>();
  const [formElements, setFormElements] = useState<Array<LenderFields>>();
  const [formInitialValues, setFormInitialValues] = useState();
  const [postStatus, setPostStatus] = useState<LenderPostResponse | null>();

  /**
   * Generate initial data to pass  form fields
   * @param formElements List of from elements
   * Output {"first_name":"","last_name","",...}
   */

  const prepareDefaultData = (formElements: LenderFields[]) => {
    const _formData = {} as any;
    formElements.forEach(({ name, type }) => {
      if (type === CHECK_BOX) {
        _formData[name] = false;
      } else {
        _formData[name] = '';
      }
    });
    setFormInitialValues(_formData);
  };

  /**
   * Beautify name in more readable format. Replacing  character '_' with the space and capitalizing first character
   * @param name Input Name
   * @returns "first_name" will return as "First name"
   */
  const formatLabel = (name: string) => {
    const _label = name.replace(/_/g, ' ');
    return _label.charAt(0).toUpperCase() + _label.slice(1);
  };

  /**
   * Preparing from Elements to render form
   * @param fields
   * @returns
   */
  const prepareFormElements = (fields: Array<any>) => {
    if (data?.fields[0]?.hasOwnProperty('type')) {
      return fields.map((field: LenderFields) => {
        return { ...field, label: formatLabel(field.name) };
      });
    } else {
      return fields.map((field: string) => {
        const obj: LenderFields = {
          name: field,
          type: 'text',
          required: true,
          label: formatLabel(field),
        };
        return obj;
      });
    }
  };
  /* -------------------------------------------------------------------------- */
  /*                                 Hooks Start                                */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/lenders/${lenderSlug}`);
        const responseData: LenderGetResponseExtended = await response.json();
        setData(responseData);
      } catch (e) {
        console.error(e);
      }
    };
    if (lenderSlug) {
      fetchData();
    }
  }, [lenderSlug]);

  const submitFormData = useCallback(
    (fromValues: any) => {
      const httpFormSubmit = async () => {
        try {
          const response = await fetch(`/api/lenders/${lenderSlug}`, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(fromValues),
          });
          const responseData: LenderPostResponse = await response.json();
          setPostStatus(responseData);
        } catch (err) {
          console.log(err);
        }
      };
      httpFormSubmit();
    },
    [lenderSlug],
  );

  useEffect(() => {
    if (data) {
      const _formElements = prepareFormElements(data.fields);
      prepareDefaultData(_formElements);
      setFormElements(_formElements);
      setLenderName(data.name);
    }
  }, [data]);

  /* -------------------------------------------------------------------------- */
  /*                                  Hooks End                                 */
  /* -------------------------------------------------------------------------- */

  return (
    <>
      {lenderSlug ? (
        <React.Fragment>
          <CssBaseline />
          <Container>
            <Paper
              square
              style={{
                maxWidth: '500px',
                margin: '20px auto',
                padding: '30px',
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                align="center"
                className="lenderName"
              >
                {lenderName}
              </Typography>

              {formElements ? (
                <BuildFormComponent
                  formInitialValues={formInitialValues}
                  formElements={formElements}
                  submitForm={submitFormData}
                />
              ) : (
                'Loading...'
              )}
            </Paper>
            {!!postStatus && (
              <ToasterComponent
                handleTosterClose={() => setPostStatus(null)}
                decision={postStatus.decision}
              ></ToasterComponent>
            )}
          </Container>
        </React.Fragment>
      ) : (
        `invalid url`
      )}
    </>
  );
};

export default LenderNamePage;
