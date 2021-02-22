using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace DemoApi.Models
{
    public class ModelClass
    {
    }

    public class Errors
    {
        public int error_code { get; set; }
        public string error { get; set; }
        public object exception { get; set; }
    }

    public class Return_Load
    { 

        public int status { get; set; }
        public object data { get; set; }
        public Errors error { get; set; }
    }
     



}