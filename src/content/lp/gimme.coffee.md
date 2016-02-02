
# Gimme

    gimme = (module) ->
      thang = (require module) || 'notfound'
      console.log thang
      thang

    it = gimme 'bogus'
