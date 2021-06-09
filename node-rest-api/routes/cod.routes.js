const express = require('express');
const app = express();
const codRoute = express.Router();
const API = require('call-of-duty-api')({ platform: 'battle' });

// Login
codRoute.route('/login').post((req, res, next) => {
  API.login(req.body.email, req.body.password)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get lifetime stats
codRoute.route('/lifetime/:gametype/:gamertag/:platform').get((req, res) => {
  if (req.params.gametype == 'mp') {
    API.MWmp(req.params.gamertag, req.params.platform)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    API.MWwz(req.params.gamertag, req.params.platform)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

// Get recent match details
codRoute.route('/recentmatches/:gametype/:gamertag/:platform').get((req, res) => {
  if (req.params.gametype == 'mp') {
    API.MWcombatmp(req.params.gamertag, req.params.platform)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  } else {
    API.MWcombatwz(req.params.gamertag, req.params.platform)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        res.json(err);
      });
  }
});

// Get battle royale stats
codRoute.route('/battleroyale/:gamertag/:platform').get((req, res) => {
  API.MWBattleData(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get weekly stats
codRoute.route('/weekly/:gamertag/:platform').get((req, res) => {
  API.MWweeklystats(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get match analysis
codRoute.route('/analysis/:gamertag/:platform').get((req, res) => {
  API.MWAnalysis(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get map list
codRoute.route('/maps').get((req, res) => {
  API.MWMapList()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get battle pass loot
codRoute.route('/loot/:gamertag/:platform').get((req, res) => {
  API.MWloot(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get battle pass tiers
codRoute.route('/tiers/:season/:platform').get((req, res) => {
  API.getBattlePassLoot(req.params.season, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get cod points
codRoute.route('/points/:gamertag/:platform').get((req, res) => {
  API.getCodPoints(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get loggin in user info
codRoute.route('/userinfo').get((req, res) => {
  API.getLoggedInUserInfo()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get connected accounts
codRoute.route('/accounts/:gamertag/:platform').get((req, res) => {
  API.ConnectedAccounts(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get event feed
codRoute.route('/events').get((req, res) => {
  API.getEventFeed()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get identities
codRoute.route('/identities').get((req, res) => {
  API.getLoggedInIdentities()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get settings
codRoute.route('/settings/:gamertag/:platform').get((req, res) => {
  API.Settings(req.params.gamertag, req.params.platform)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Get platforms
codRoute.route('/platforms').get((req, res) => {
  res.json(['battle', 'steam', 'psn', 'xbl', 'acti', 'uno', 'all']);
});

// Get games
codRoute.route('/games').get((req, res) => {
  res.json(['mw', 'cw', 'wwii', 'bo4']);
});

// Get game types
codRoute.route('/gametypes').get((req, res) => {
  res.json(['mp', 'wz', 'zm']);
});

// Exports
module.exports = codRoute;