using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoApi.Models
{
    public class DemoFunctions
    {
        public static Errors GetException(Exception ex)
        {
            var error = new Errors();

            error.error_code = ex.HResult;
            error.error = ex.Message;

            if (ex.InnerException != null)
            {
                var ie = ex.InnerException;

                error.error_code = ie.HResult;
                error.error = ie.Message;

                if (ie.InnerException != null)
                {
                    //error.error_code = ie.InnerException.HResult;
                    //error.error = ie.InnerException.Message;

                    error = GetException(ie);
                }
            }

            return error;
        }

    }
}