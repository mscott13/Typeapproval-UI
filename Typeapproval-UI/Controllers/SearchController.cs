using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using Typeapproval_UI.Models;

namespace Typeapproval_UI.Controllers
{
    public class SearchController : Controller
    {
        public ActionResult Index(string dealer = "", string model = "")
        {
            if (dealer == null) { dealer = ""; }
            if (model == null) { model = ""; }

            dealer = dealer.TrimStart();
            dealer = dealer.TrimStart();

            model = model.TrimStart();
            model = model.TrimEnd();

            List<TypeApproval> typeApprovals = null;

            string json = "";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://localhost:54367/api/search/");
                var response = client.GetAsync("TypeApprovalDetails?Dealer=" + dealer + "&" + "Model=" + model);
                response.Wait();

                var result = response.Result;
                if (result.IsSuccessStatusCode)
                {
                    var read = result.Content.ReadAsStringAsync();

                    read.Wait();
                    json = read.Result;

                    typeApprovals = (List<TypeApproval>)JsonConvert.DeserializeObject(json);
                }
                else
                {
                    typeApprovals = new List<TypeApproval>();
                }
            }
            return View(typeApprovals);
        }
    }
}