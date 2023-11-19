
export default class HomeController {
  renderHome(req, res){
    if(req.isAuthenticated()){
      return res.redirect('/dashboard');
    }
    res.render('home')
  }
  renderDashboard(req, res){
    res.render('dashboard');
  }
}